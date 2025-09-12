// Simple localStorage-based ABHA card storage
const ABHA_STORAGE_KEY = 'abha_cards';

export const saveABHACard = (userData) => {
  try {
    const existingCards = getABHACards();
    const newCard = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    
    // Add or update the card
    const updatedCards = [...existingCards.filter(card => card.abhaAddress !== userData.abhaAddress), newCard];
    localStorage.setItem(ABHA_STORAGE_KEY, JSON.stringify(updatedCards));
    return newCard;
  } catch (error) {
    console.error('Error saving ABHA card:', error);
    return null;
  }
};

export const getABHACards = () => {
  try {
    const cards = localStorage.getItem(ABHA_STORAGE_KEY);
    return cards ? JSON.parse(cards) : [];
  } catch (error) {
    console.error('Error retrieving ABHA cards:', error);
    return [];
  }
};

export const getABHACardByAddress = (abhaAddress) => {
  try {
    const cards = getABHACards();
    return cards.find(card => card.abhaAddress === abhaAddress) || null;
  } catch (error) {
    console.error('Error retrieving ABHA card:', error);
    return null;
  }
};

export const hasABHACard = () => {
  const cards = getABHACards();
  return cards.length > 0;
};

export const getLatestABHACard = () => {
  const cards = getABHACards();
  if (cards.length === 0) return null;
  
  // Return the most recently created card
  return cards.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
};

export const deleteABHACard = (abhaAddress) => {
  try {
    const cards = getABHACards();
    const updatedCards = cards.filter(card => card.abhaAddress !== abhaAddress);
    localStorage.setItem(ABHA_STORAGE_KEY, JSON.stringify(updatedCards));
    return true;
  } catch (error) {
    console.error('Error deleting ABHA card:', error);
    return false;
  }
};

export const deleteAllABHACards = () => {
  try {
    localStorage.removeItem(ABHA_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error deleting all ABHA cards:', error);
    return false;
  }
};
