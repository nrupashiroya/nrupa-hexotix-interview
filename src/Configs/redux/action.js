export const saveUserData = (formData) => ({
  type: 'SAVE_FORM_DATA',
  payload: formData,
});

export const showSidebar = (sidebar) => ({
  type: 'SIDEBAR',
  payload: sidebar,
});