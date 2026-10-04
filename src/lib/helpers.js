// Laravel কখনো message পাঠায় array হিসেবে (["OTP sent successfully"]), কখনো string হিসেবে
const toText = (message) =>
    Array.isArray(message) ? message.join(', ') : message

// সার্ভার বন্ধ/নেটওয়ার্ক এরর হলে error.response থাকে না, তাই ডিফল্ট মেসেজ
const getErrorMessage = (error) =>
    toText(error.response?.data?.message) || 'Something went wrong. Please try again.'

export { toText, getErrorMessage }