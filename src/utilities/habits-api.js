import sendRequest from "./send-request";

const BASE_URL = "api/habits";

// get all habits
export function getAll() {
  return sendRequest(BASE_URL);
}

export function createHabit() {
  return sendRequest(`${BASE_URL}`, "POST", postData);
}

export function updateHabit(id, body) {
  return sendRequest(`${BASE_URL}/${id}`, "PUT", body);
}

export function deleteHabit(id) {
  return sendRequest(`${BASE_URL}/${id}`, "DELETE");
}
