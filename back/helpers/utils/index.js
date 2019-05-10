exports.generateToken  = (n = 40) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for(let i = 0; i < n; i++)
        token += chars[Math.floor(Math.random() * chars.length)];
    return token;
};