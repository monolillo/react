
export const getSkill = () => {
  return {
      type: 'GET_SKILL',
      payload: []
  }
}
export const setSkillFromSearch = (skill) => {
  return {
      type: 'SET_SKILL_FROM_SEARCH',
      payload: skill
  }
}
