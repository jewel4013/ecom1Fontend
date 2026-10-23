// Laravel কখনো message পাঠায় array হিসেবে (["OTP sent successfully"]), কখনো string হিসেবে
const toText = (message) =>
    Array.isArray(message) ? message.join(', ') : message

// সার্ভার বন্ধ/নেটওয়ার্ক এরর হলে error.response থাকে না, তাই ডিফল্ট মেসেজ
const getErrorMessage = (error) =>
    toText(error.response?.data?.message) || 'Something went wrong. Please try again.'

// backend-এর ঠিকানা (http://localhost:8000), API URL থেকে বের করে নিচ্ছি
const backendOrigin = new URL(import.meta.env.VITE_APP_BASE_URL).origin

// image-এ পুরো লিংক থাকলে সেটাই, শুধু path (products/abc.jpg) থাকলে storage URL জুড়ে দেব
const imageUrl = (path) => {
    if (!path) return null
    if (path.startsWith('http://') || path.startsWith('https://')) return path
    return `${backendOrigin}/storage/${path}`
}

// 1234.5 → "৳1,234.50"
const money = (value) =>
    '৳' + Number(value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : '-')

// Invoice-এর status অনুযায়ী Bootstrap badge-এর রং
const orderStatusClass = {
    Pending: 'bg-secondary',
    Confirmed: 'bg-info',
    Processing: 'bg-warning',
    Completed: 'bg-success',
    Canceled: 'bg-danger',
}

const paymentStatusClass = {
    Unpaid: 'bg-danger',
    PartiallyPaid: 'bg-warning',
    Paid: 'bg-success',
}

export { toText, getErrorMessage, imageUrl, money, formatDate, orderStatusClass, paymentStatusClass }