// const API_URL = 'http://localhost:3000'
const API_URL = "http://135.118.230.73:3000";

export async function getWeather(city: string) {
  let new_city = city.split(" ");
  let city_correct = "";

  for (let i = 0; i < new_city.length; i++) {
    city_correct += new_city[i];
    if (i !== new_city.length - 1) {
      city_correct += "+";
    }
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1000); // 1000 ms = 1s

  try {
    const response = await fetch(`${API_URL}/weather/${city_correct}`, {
      signal: controller.signal,
    });

    clearTimeout(timeout); // Clear the timeout if request completes

    const data = await response.json();

    if (!response.ok) {
      console.log("NOT OK");
      return {
        ok: false,
        error: "Server returned an error",
        status: response.status,
      };
    }

    return { ok: true, ...data };
  } catch (error) {
    clearTimeout(timeout);

    if (error.name === "AbortError") {
      console.error("Request timed out");
      return {
        ok: false,
        error: "Request timed out",
        networkError: true,
      };
    }

    console.error("Other fetch error:", error);
    return {
      ok: false,
      error: "Backend unreachable or failed",
      networkError: true,
    };
  }
}

export async function checkConnectivity(): Promise<boolean> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1000); // 1 second timeout

  try {
    const response = await fetch(API_URL + "/online", {
      signal: controller.signal,
    });

    clearTimeout(timeout);

    return response.ok;
  } catch (e) {
    clearTimeout(timeout);

    if (e.name === "AbortError") {
      console.error("Connectivity check timed out");
    } else {
      console.error("Connectivity check failed:", e);
    }

    return false;
  }
}
