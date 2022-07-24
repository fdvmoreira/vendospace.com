import { toast } from "react-toastify";

/**
 * Custom notification toast
 * @param {*} message the message to display
 * @param {*} success succeeded?
 * @returns Toast ID
 */
const notify = (message, success = true) => {
    if (!success) return toast.error(message);
    toast.success(message);
};

export default notify;