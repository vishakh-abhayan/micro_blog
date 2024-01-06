# Microblog API Documentation

## Overview
This documentation outlines the Microblog API, detailing the available endpoints for posting and retrieving microblogs.

---

## Endpoints

### 1. Post a Microblog

- **HTTP Method:** POST
- **Route:** `/microblog/post`
- **Headers:** 
  - `Authorization`: Bearer `<token>` (Replace `<token>` with your JWT)
  - `Content-Type`: application/json
- **Request Body:**
  ```json
  {
    "content": "Your microblog content here"
  }
