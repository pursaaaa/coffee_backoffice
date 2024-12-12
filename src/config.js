const config = {
    apiPath: "https://coffee-api-9lij.onrender.com" || 'http://localhost:3001',
    headers: () => {
        return {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }
    }
}

export default config;
