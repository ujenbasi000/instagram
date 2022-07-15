import Image from "next/image";
import InstagramLogo from "../../public/assets/Instagram-logo.png";
import Link from "next/link";
import GoogleLogo from "../../public/assets/google.png";
import { handler } from "../../helpers/utility";
import { useEffect, useRef, useState } from "react";
import { login } from "../../helpers/async/user.async";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../graphql/query";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [LoginFunction] = useMutation(LOGIN_MUTATION);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const [details, setDetails] = useState({
    emailOrUsername: "",
    password: "",
  });

  useEffect(() => {
    if (details.emailOrUsername && details.password) setDisableBtn(false);
  }, [details]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      data: { loginUser: data },
    } = await login(LoginFunction, details, setLoading, setError);
    if (data.sucess) {
      router.push("/");
    }
  };

  const slideShow1 = useRef();
  const slideShow2 = useRef();
  const slideShow3 = useRef();
  const slideShow4 = useRef();

  let i = 1;

  useEffect(() => {
    setInterval(() => {
      if (window.innerWidth > 768) {
        const slideShow = [slideShow1, slideShow2, slideShow3, slideShow4];
        slideShow.forEach(
          (element) => element.current && (element.current.style.opacity = 0)
        );
        slideShow[i].current && (slideShow[i].current.style.opacity = 1);
        i === 3 ? (i = 0) : (i += 1);
      }
    }, 4000);
  }, []);

  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto flex items-center gap-6">
          <div className="hidden xl:block login-slider">
            <div className="slider-container">
              <div className="images">
                <img
                  src={"/images/ss1.png"}
                  alt=""
                  ref={slideShow1}
                  className="transition-all duration-1000 absolute opacity-1"
                />
                <img
                  src={"/images/ss2.png"}
                  alt=""
                  ref={slideShow2}
                  className="transition-all duration-1000 absolute opacity-0"
                />
                <img
                  src={"/images/ss3.png"}
                  alt=""
                  ref={slideShow3}
                  className="transition-all duration-1000 absolute opacity-0"
                />
                <img
                  src={"/images/ss4.png"}
                  alt=""
                  ref={slideShow4}
                  className="transition-all duration-1000 absolute opacity-0"
                />
              </div>
            </div>
          </div>
          <div className="mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-61px)] h-full">
            <div className="bg-white border border-gray-300 w-96 py-6 relative z-30 rounded-sm">
              <div className="flex items-center justify-center">
                <Image src={InstagramLogo} width={120} height={35} alt="Logo" />
              </div>
              <div className="w-10/12 mx-auto">
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    name="emailOrUsername"
                    autoComplete="off"
                    value={details.emailOrUsername}
                    onChange={(e) => handler(e, details, setDetails)}
                    placeholder="Username or email"
                    className="btn-input"
                  />
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      onChange={(e) => handler(e, details, setDetails)}
                      value={details.password}
                      placeholder="Password"
                      className="btn-input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute top-1/2 right-2 -translate-y-1/2"
                    >
                      <i
                        className={`uil uil-eye${showPassword ? "-slash" : ""}`}
                      ></i>
                    </button>
                  </div>
                  <button
                    disabled={disableBtn ? true : ""}
                    type="submit"
                    className="mt-4 disabled:opacity-70 w-full bg-blue-400 hover:bg-blue-500 rounded-md outline-none text-white font-medium text-sm py-2"
                  >
                    Log In
                  </button>
                </form>
              </div>
              <div className="flex items-center justify-center my-4">
                <div className="or w-full px-4 text-center">
                  <span>OR</span>
                </div>
              </div>

              <div className="text-center text-sm font-medium my-6">
                <button className="relative flex items-center rounded-sm justify-center gap-2 bg-blue-400 hover:bg-blue-500 text-center font-medium text-white w-7/12 mx-auto py-2">
                  <div className="absolute top-1 left-1">
                    <Image src={GoogleLogo} width={28} height={28} />
                  </div>
                  <span className="ml-4">Login with Google</span>
                </button>
              </div>

              <div className="text-center text-xs">
                <Link href="/">
                  <span className="cursor-pointer">Forgot password?</span>
                </Link>
              </div>
            </div>
            <div className="bg-white border border-gray-300 w-96 py-4 relative z-30 my-6 rounded-sm px-4">
              <p className="text-sm text-center">
                <span className="mr-2">Don't have and account?</span>
                <Link href="/accounts/signup">
                  <span className="text-blue-500 font-semibold cursor-pointer">
                    Sign up
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
