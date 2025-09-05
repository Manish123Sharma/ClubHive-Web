import { toast } from "react-toastify";

const emailLogin = async ({
    email,
    password,
    setLoading,
    resetFields
}) => {
    // toast.success('Login Successful');
    if (!email || !password) {
        toast.error('Please fill all the fields..');
        setLoading(false);
        return;
    }
    try {
        toast.success('Login Successful');
        resetFields();
    } catch (error) {
        console.error("Signup error", error);
        toast.error(error.message);
        setLoading(false);
    }
};

export default emailLogin;