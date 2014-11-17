package onenote.picker.example;

public interface Callback<T> {
    public void success(T result);

    public void failure(Throwable e);
}
