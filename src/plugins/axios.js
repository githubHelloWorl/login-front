import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    console.log("请求");
    console.log(config);
    // Do something before request is sent
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    console.log("响应", response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status code that false outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
