package com.bakery.backend.dto;

public class RegisterRequest {

    public String username;
    public String password;
    public String fullname;
    public String email;
    public String phone;
    public String address;

    public RegisterRequest( String username,  String password, String fullname, String email, String phone, String address ) {
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }
    public String getUsername() {
        return username;
    }
     public String getPassword() {
            return password;
     }
     public String getFullname() {
        return fullname;
     }
     public String getEmail() {
        return email;
     }
     public String getPhone() {
        return phone;
     }
     public String getAddress() {
        return address;
     }
}