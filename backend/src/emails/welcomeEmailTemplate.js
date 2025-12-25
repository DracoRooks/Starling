
export const createWelcomeEmailTemplate = (username, clientURL) => {
    return `
        <center>
            Welcome to Starling!
            <a href="http://localhost:2000/api/message/send">Starling</a>
        </center>
    `
}