package es.pokemon100.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.ContentValues;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;
import android.view.View;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

/**
 * Abre la guía Pokémon 100 % (la web publicada) a pantalla completa.
 * - Conserva los datos de la web (localStorage, caché sin conexión del service worker).
 * - Permite elegir el archivo de partida (selector de archivos del sistema).
 * - «Exportar JSON» guarda la copia en Descargas.
 * - Los enlaces a otras webs se abren en el navegador; atrás navega dentro de la guía.
 */
public class MainActivity extends Activity {
    private static final String START_URL = "https://adriandelgadoalcalde-alt.github.io/pokemon-100-gu-a/atlas.html";
    private static final String SITE_HOST = "adriandelgadoalcalde-alt.github.io";
    private static final String SITE_PATH = "/pokemon-100-gu-a/";
    private static final int FILE_CHOOSER = 1;

    private WebView web;
    private ValueCallback<Uri[]> pendingFiles;

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        web = new WebView(this);
        web.setBackgroundColor(Color.parseColor("#0A1020"));
        setContentView(web);

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setCacheMode(WebSettings.LOAD_DEFAULT);
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(true);
        s.setMediaPlaybackRequiresUserGesture(true);
        s.setLoadWithOverviewMode(true);
        s.setUseWideViewPort(true);
        s.setUserAgentString(s.getUserAgentString() + " Pokemon100App");

        web.addJavascriptInterface(new Bridge(), "Pokemon100App");

        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri u = request.getUrl();
                if (isGuide(u)) return false;
                openOutside(u);
                return true;
            }
        });

        web.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback, FileChooserParams params) {
                if (pendingFiles != null) pendingFiles.onReceiveValue(null);
                pendingFiles = callback;
                Intent pick = new Intent(Intent.ACTION_GET_CONTENT);
                pick.addCategory(Intent.CATEGORY_OPENABLE);
                pick.setType("*/*"); // los guardados (.sav, main…) no tienen un tipo MIME fiable
                pick.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, params.getMode() == FileChooserParams.MODE_OPEN_MULTIPLE);
                try {
                    startActivityForResult(Intent.createChooser(pick, "Elige tu archivo"), FILE_CHOOSER);
                } catch (ActivityNotFoundException e) {
                    pendingFiles = null;
                    Toast.makeText(MainActivity.this, "No hay ningún selector de archivos", Toast.LENGTH_LONG).show();
                    return false;
                }
                return true;
            }
        });

        // Descargas: los «blob:» de la web (Exportar JSON) se leen en la página y se guardan en Descargas.
        web.setDownloadListener((url, userAgent, contentDisposition, mimeType, length) -> {
            if (url.startsWith("blob:")) {
                String js = "(async()=>{try{const r=await fetch('" + url + "');const b=await r.blob();"
                        + "const f=new FileReader();f.onload=()=>Pokemon100App.save(f.result.split(',')[1],b.type||'" + mimeType + "');"
                        + "f.readAsDataURL(b);}catch(e){Pokemon100App.fail(String(e));}})()";
                web.evaluateJavascript(js, null);
            } else if (url.startsWith("data:")) {
                int comma = url.indexOf(',');
                if (comma > 0) new Bridge().save(url.substring(comma + 1), mimeType);
            } else {
                openOutside(Uri.parse(url));
            }
        });

        if (savedInstanceState != null) web.restoreState(savedInstanceState);
        else web.loadUrl(START_URL);
        hideSystemBars();
    }

    private static boolean isGuide(Uri u) {
        return u != null && SITE_HOST.equalsIgnoreCase(u.getHost()) && u.getPath() != null && u.getPath().startsWith(SITE_PATH);
    }

    private void openOutside(Uri u) {
        try {
            startActivity(new Intent(Intent.ACTION_VIEW, u));
        } catch (ActivityNotFoundException ignored) {
        }
    }

    private void hideSystemBars() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            getWindow().setDecorFitsSystemWindows(false);
            WindowInsetsController c = getWindow().getInsetsController();
            if (c != null) {
                c.hide(WindowInsets.Type.statusBars() | WindowInsets.Type.navigationBars());
                c.setSystemBarsBehavior(WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
            }
        } else {
            getWindow().getDecorView().setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
        }
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) hideSystemBars();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode != FILE_CHOOSER || pendingFiles == null) return;
        Uri[] result = null;
        if (resultCode == RESULT_OK && data != null) {
            if (data.getClipData() != null) {
                int n = data.getClipData().getItemCount();
                result = new Uri[n];
                for (int i = 0; i < n; i++) result[i] = data.getClipData().getItemAt(i).getUri();
            } else if (data.getData() != null) {
                result = new Uri[]{data.getData()};
            }
        }
        pendingFiles.onReceiveValue(result);
        pendingFiles = null;
    }

    @Override
    public void onBackPressed() {
        if (web.canGoBack()) web.goBack();
        else super.onBackPressed();
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        web.saveState(outState);
    }

    @Override
    protected void onPause() {
        super.onPause();
        web.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        web.onResume();
    }

    /** Puente para guardar en Descargas lo que la web exporta. */
    private class Bridge {
        @JavascriptInterface
        public void save(String base64, String mime) {
            String type = (mime == null || mime.isEmpty()) ? "application/json" : mime;
            String ext = type.contains("json") ? ".json" : type.contains("html") ? ".html" : type.contains("text") ? ".txt" : ".bin";
            String name = "pokemon100-" + System.currentTimeMillis() + ext;
            try {
                byte[] bytes = Base64.decode(base64, Base64.DEFAULT);
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    ContentValues v = new ContentValues();
                    v.put(MediaStore.Downloads.DISPLAY_NAME, name);
                    v.put(MediaStore.Downloads.MIME_TYPE, type);
                    Uri dest = getContentResolver().insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, v);
                    try (OutputStream out = getContentResolver().openOutputStream(dest)) {
                        out.write(bytes);
                    }
                } else {
                    File dir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
                    if (!dir.exists()) dir.mkdirs();
                    try (FileOutputStream out = new FileOutputStream(new File(dir, name))) {
                        out.write(bytes);
                    }
                }
                toast("Guardado en Descargas: " + name);
            } catch (Exception e) {
                toast("No se ha podido guardar: " + e.getMessage());
            }
        }

        @JavascriptInterface
        public void fail(String message) {
            toast("No se ha podido descargar: " + message);
        }
    }

    private void toast(String text) {
        runOnUiThread(() -> Toast.makeText(MainActivity.this, text, Toast.LENGTH_LONG).show());
    }
}
