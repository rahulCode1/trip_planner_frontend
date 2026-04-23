import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const handleLogin = async () => {
    try {
      window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>✈️</div>

        <h1 className={styles.title}>AI Travel Planner</h1>
        <p className={styles.subtitle}>
          Enter your destination, budget & trip duration — get a full
          personalised travel plan in seconds.
        </p>

        <div className={styles.features}>
          {[
            { emoji: "🗺️", label: "Destination", value: "Any city or country" },
            {
              emoji: "💶",
              label: "Budget",
              value: "Budget · Standard · Luxury breakdowns",
            },
            {
              emoji: "📅",
              label: "Duration",
              value: "1–10 day itineraries with daily plans",
            },
          ].map(({ emoji, label, value }) => (
            <div key={label} className={styles.featureRow}>
              <span className={styles.featureEmoji}>{emoji}</span>
              <div>
                <p className={styles.featureLabel}>{label}</p>
                <p className={styles.featureValue}>{value}</p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={handleLogin} className={styles.googleBtn}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
              fill="#4285F4"
            />
            <path
              d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
              fill="#34A853"
            />
            <path
              d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
              fill="#FBBC05"
            />
            <path
              d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        <p className={styles.legal}>Free to use · No credit card required</p>
      </div>
    </main>
  );
};

export default LoginPage;
