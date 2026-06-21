// src/config/appConfig.js

const AppConfig = {
    appType : import.meta.env.VITE_APP_TYPE,
    appName: import.meta.env.VITE_APP_NAME,
    appTitle: import.meta.env.VITE_APP_TITLE,
    appDescription: import.meta.env.VITE_APP_DESCRIPTION,
    companyName: import.meta.env.VITE_COMPANY_NAME,
    companySubName: import.meta.env.VITE_COMPANY_SUBNAME,
    apiUrl: import.meta.env.VITE_API_URL,
    supportEmail: import.meta.env.VITE_SUPPORT_EMAIL,
    version: import.meta.env.VITE_VERSION,
};

export default AppConfig;