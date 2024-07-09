export default function Root() {
    try {
        var profile = localStorage.getItem("profile")
        return JSON.stringify(profile)
    } catch (e) {
        return null
    }
}