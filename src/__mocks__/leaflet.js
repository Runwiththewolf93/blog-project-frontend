module.exports = {
  Icon: jest.fn(() => ({})),
  map: jest.fn(() => ({
    setView: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
  })),
  tileLayer: jest.fn(() => ({
    addTo: jest.fn(),
  })),
  marker: jest.fn(() => ({
    addTo: jest.fn(),
  })),
  Control: {
    Scale: jest.fn(() => ({
      addTo: jest.fn(),
    })),
  },
};
