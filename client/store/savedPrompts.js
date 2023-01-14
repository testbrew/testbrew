import axios from 'axios';

const savedPrompts = (state = [], action) => {
  if (action.type === 'SET_SAVEDPROMPTS') {
    state = action.savedPrompts;
  }
  return state;
};

export const _setSavedPrompts = (savedPrompts) => {
  return {
    type: 'SET_SAVEDPROMPTS',
    savedPrompts,
  };
};

export const fetchSavedPrompts = (userId, promptId) => {
  return async (dispatch) => {
    const savedPrompts = await axios.post('/api/savedPrompts', {
      body: {
        userId: userId,
        promptId: promptId,
      },
    });
    dispatch(_setSavedPrompts(savedPrompts));
  };
};

export default savedPrompts;
