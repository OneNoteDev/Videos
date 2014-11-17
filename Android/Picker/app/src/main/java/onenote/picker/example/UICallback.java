package onenote.picker.example;

import android.app.Activity;

import java.lang.ref.WeakReference;

public abstract class UICallback<T> implements Callback<T> {
    private final WeakReference<Activity> activity;

    public UICallback(Activity a) {
        activity = new WeakReference<Activity>(a);
    }

    public final void success(final T result) {
        Activity act = activity.get();
        if (act != null) {
            act.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    onSuccess(result);
                }
            });
        }
    }

    public abstract void onSuccess(T result);

    public final void failure(final Throwable result) {
        Activity act = activity.get();
        if (act != null) {
            act.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    onFailure(result);
                }
            });
        }
    }

    public abstract void onFailure(Throwable result);
}
