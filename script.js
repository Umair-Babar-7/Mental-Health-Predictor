const homeView = document.getElementById('home-view');
const predictView = document.getElementById('predict-view');
const form = document.getElementById('predict-form');
const resultValue = document.getElementById('result-value');
const statusBox = document.getElementById('status-box');
const submitButton = document.getElementById('submit-button');
const startButton = document.getElementById('start-button');

const apiUrl = '/predict';

function setStatus(message, type = 'default') {
  statusBox.textContent = message;
  statusBox.className = 'status-box';
  if (type === 'error') statusBox.classList.add('error');
  if (type === 'success') statusBox.classList.add('success');
}

function createLoadingMessage() {
  statusBox.innerHTML = 'Waiting for response <span class="loading-dot"></span><span class="loading-dot"></span><span class="loading-dot"></span>';
  statusBox.className = 'status-box';
}

function gatherFormData(formData) {
  return {
    age: Number(formData.get('age')),
    gender: formData.get('gender'),
    country: formData.get('country'),
    acadimic_level: formData.get('acadimic_level'),
    most_used_platform: formData.get('most_used_platform'),
    purpose_of_use: formData.get('purpose_of_use'),
    avg_daily_usage_hours: Number(formData.get('avg_daily_usage_hours')),
    daily_unlocks: Number(formData.get('daily_unlocks')),
    study_hours: Number(formData.get('study_hours')),
    physical_activity_hours: Number(formData.get('physical_activity_hours')),
    sleep_hours_per_night: Number(formData.get('sleep_hours_per_night')),
    stress_level: formData.get('stress_level'),
  };
}

function validatePayload(payload) {
  if (!payload.age || payload.age < 10 || payload.age > 100) return 'Age must be between 10 and 100.';
  if (!payload.gender) return 'Please select your gender.';
  if (!payload.country) return 'Please select your country.';
  if (!payload.acadimic_level) return 'Please select your academic level.';
  if (!payload.most_used_platform) return 'Please select your most used social platform.';
  if (!payload.purpose_of_use) return 'Please select the purpose of use.';
  if (Number.isNaN(payload.avg_daily_usage_hours) || payload.avg_daily_usage_hours < 0 || payload.avg_daily_usage_hours > 24) return 'Average daily usage hours must be between 0 and 24.';
  if (!Number.isInteger(payload.daily_unlocks) || payload.daily_unlocks < 0) return 'Daily unlocks must be 0 or greater.';
  if (Number.isNaN(payload.study_hours) || payload.study_hours < 0 || payload.study_hours > 24) return 'Study hours must be between 0 and 24.';
  if (Number.isNaN(payload.physical_activity_hours) || payload.physical_activity_hours < 0 || payload.physical_activity_hours > 2) return 'Physical activity hours must be between 0 and 2.';
  if (Number.isNaN(payload.sleep_hours_per_night) || payload.sleep_hours_per_night < 0 || payload.sleep_hours_per_night > 24) return 'Sleep hours per night must be between 0 and 24.';
  if (!payload.stress_level) return 'Please select your stress level.';
  return null;
}

async function submitPrediction(payload) {
  submitButton.disabled = true;
  createLoadingMessage();

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorText = errorData?.detail ? JSON.stringify(errorData.detail) : response.statusText;
      throw new Error(`API error: ${errorText}`);
    }

    const result = await response.json();
    if (typeof result.predicted_mental_health_score !== 'number') {
      throw new Error('The API returned an unexpected response.');
    }

    resultValue.textContent = result.predicted_mental_health_score.toFixed(2);
    setStatus('Prediction received successfully.', 'success');
  } catch (error) {
    resultValue.textContent = '--';
    setStatus(error.message || 'Unable to complete prediction.', 'error');
  } finally {
    submitButton.disabled = false;
  }
}

function showView(viewName) {
  homeView.classList.toggle('hidden', viewName !== 'home');
  predictView.classList.toggle('hidden', viewName !== 'predict');
}

function initRouting() {
  const path = window.location.pathname;
  showView(path === '/predict-page' ? 'predict' : 'home');
  if (path === '/predict-page') {
    setStatus('Complete the form and click Predict to generate your score.');
  }
}

startButton?.addEventListener('click', () => {
  window.location.href = '/predict-page';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = gatherFormData(new FormData(form));
  const validationError = validatePayload(data);

  if (validationError) {
    resultValue.textContent = '--';
    setStatus(validationError, 'error');
    return;
  }

  submitPrediction(data);
});

initRouting();
