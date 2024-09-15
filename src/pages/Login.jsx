import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, db } from "../components/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  OAuthProvider,
} from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";
import { FaCheck, FaGoogle, FaApple } from "react-icons/fa";
const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider("apple.com");
function Login() {
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const role = userData.role.toLowerCase();

          if (role === "admin") {
            navigate("/admin");
          } else if (role === "user") {
            navigate("/products");
          } else {
            setMessage("Unknown role");
          }
        } else {
          setMessage("User data not found");
        }

        setMessage("Logged in successfully");
        formik.resetForm();
      } catch (error) {
        setMessage("Login failed");
        setTimeout(() => {
          setMessage();
        }, 1500);
      }
    },
  });

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role.toLowerCase();

        if (role === "admin") {
          navigate("/admin");
        } else if (role === "user") {
          navigate("/products");
        } else {
          setMessage("Unknown role");
        }
      } else {
        setMessage("User data not found");
      }

      setMessage("Logged in with Google successfully");
    } catch (error) {
      setMessage("Google login failed");
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
      setMessage("Password reset email sent!");
      setShowResetForm(false);
    } catch (error) {
      setMessage("Failed to send reset email");
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, appleProvider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role.toLowerCase();

        if (role === "admin") {
          navigate("/admin");
        } else if (role === "user") {
          navigate("/products");
        } else {
          setMessage("Unknown role");
        }
      } else {
        setMessage("User data not found");
      }

      setMessage("Logged in with Apple successfully");
    } catch (error) {
      setMessage("Apple login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen login p-4 pt-24 mt-8 sm:p-6">
      <div className="bg-white rounded-lg shadow-2xl flex flex-col sm:flex-row w-full max-w-4xl">
        {/* Left Side - Form */}
        <div className="w-full sm:w-1/2 p-6 sm:p-8">
          <h2 className="text-3xl sm:text-3xl font-bold mb-6 text-center text-purple-700">
            Welcome Back
          </h2>
          {message && (
            <p
              className={
                message.includes("success")
                  ? "text-green-600 text-center mb-4"
                  : "text-red-600 text-center mb-4"
              }
            >
              {message}
            </p>
          )}
          {!showResetForm ? (
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <input
                  className="w-full px-4 py-2 border border-purple-300 rounded-lg shadow-sm focus:outline-none focus:border-purple-500"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div className="mb-6 relative">
                <input
                  className="w-full px-4 py-2 border border-purple-300 rounded-lg shadow-sm focus:outline-none focus:border-purple-500"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={toggleShowPassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <div className="flex justify-end mb-4">
                <button
                  type="button"
                  onClick={() => setShowResetForm(true)}
                  className="text-purple-600 hover:text-purple-800 font-medium"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="flex items-center justify-center mb-6">
                <button
                  type="submit"
                  className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  Log In
                </button>
              </div>
              <div className="flex items-center justify-center mb-6">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="font-bold py-2 px-4 rounded-lg focus:outline-none"
                >
                  <FaGoogle className="text-red-600 hover:text-red-800" />
                </button>
                <button
                  type="button"
                  onClick={handleAppleSignIn}
                  className="font-bold py-2 px-4 rounded-lg focus:outline-none"
                >
                  <FaApple className="text-gray-600 hover:text-gray-800" />
                </button>
              </div>
              <p className="text-center text-gray-600 text-md">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Sign Up
                </Link>{" "}
                here
              </p>
            </form>
          ) : (
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-center text-purple-700">
                Reset Password
              </h3>
              <form>
                <div className="mb-4">
                  <input
                    className="w-full px-4 py-2 border border-purple-300 rounded-lg shadow-sm focus:outline-none focus:border-purple-500"
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="flex justify-center mb-4">
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    Submit
                  </button>
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowResetForm(false)}
                    className="text-purple-600 hover:text-purple-800 font-medium"
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Right Side - Descriptions */}
        <div className="w-full sm:w-1/2 p-6 sm:p-8 bg-gradient-to-r from-violet-700 to-violet-800 text-white flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Why Choose Us?
          </h2>
          <p className="text-md sm:text-lg mb-4">
            Experience the best services with secure and easy access to your
            products.
          </p>
          <div className="">
            <div className="flex items-center space-x-2">
              <FaCheck />
              <p>Secure and fast login</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaCheck />
              <p>Access to a wide range of products</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaCheck className="text--600" />
              <p>Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
