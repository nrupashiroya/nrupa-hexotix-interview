const userData = JSON.parse(localStorage.getItem('userData'));

const initialState = {
  formData: userData || {},
  sidebar: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_FORM_DATA':
      return {
        ...state,
        formData: action.payload,
      };
    case 'SIDEBAR':
      return {
        ...state,
        sidebar: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;