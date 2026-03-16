package utez.edu.mx.back.kernel;

import org.springframework.http.HttpStatus;

public class ApiResponse {
    private String message;
    private Object data;
    private boolean error;
    private HttpStatus status;
    public ApiResponse(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }
    public ApiResponse(String message, Object data, HttpStatus status) {
        this.message = message;
        this.data = data;
        this.status = status;
    }
    public ApiResponse(String message, boolean error, HttpStatus status) {
        this.message = message;
        this.error = error;
        this.status = status;
    }
    public HttpStatus getStatus() {
        return status;
    }
    public String getMessage() {
        return message;
    }
    public Object getData() {
        return data;
    }
    public boolean isError() {
        return error;
    }
}