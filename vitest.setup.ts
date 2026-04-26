import "@testing-library/jest-dom";

// jsdom does not implement IntersectionObserver; provide a minimal stub so
// components that call new IntersectionObserver(...) can render without errors.
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverStub,
});
