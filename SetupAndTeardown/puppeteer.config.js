module.exports = {
    launch: {
        headless: process.env.HEADLESS==='false'? false:true,
        args: [`--window-size=950,1100`]
    },
    retryCount: Number(process.env.RETRIES)
};