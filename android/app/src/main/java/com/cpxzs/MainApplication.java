package com.cpxzs;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.microsoft.codepush.react.CodePush;
import com.microsoft.codepush.react.ReactInstanceHolder;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.Arrays;
import java.util.List;

class MyReactNativeHost extends ReactNativeHost implements ReactInstanceHolder {

  protected MyReactNativeHost(Application application) {
    super(application);
  }

  @Override
  public boolean getUseDeveloperSupport() {
    return false;
  }

  @Override
  protected String getJSBundleFile() {
    return CodePush.getJSBundleFile();
  }

  @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new CodePush(BuildConfig.CODEPUSH_KEY, getApplication().getApplicationContext(), BuildConfig.DEBUG),
            new VectorIconsPackage()
    );
  }
}

public class MainApplication extends Application implements ReactApplication {

  private final MyReactNativeHost mReactNativeHost = new MyReactNativeHost(this);

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    CodePush.setReactInstanceHolder(mReactNativeHost);
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
