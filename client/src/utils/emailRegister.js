import { toast } from "react-toastify";

const emailRegister = async ({
    setLoading,
    fullName,
    password,
    email,
    phoneNumber,
    primarySport,
    dob,
    country,
    state,
    city,
    gender,
    resetFields
}) => {
    // console.log('Submit Clicked');
    // toast.success('Login')
    if (!fullName || !email || !password || !phoneNumber || !primarySport || !dob || !country || !state || !city || !gender) {
        toast.error('Please fill all the fields..');
        setLoading(false);
        return;
    }

    try {
        toast.success('Register Successful');
        resetFields();
    } catch (error) {
        console.error("Signup error", error);
        toast.error(error.message);
        setLoading(false);
    }
};

export default emailRegister;