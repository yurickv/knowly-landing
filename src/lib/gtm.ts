export const pushToDataLayer = (data: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(data);
  }
};

export const trackButtonClick = (buttonName: string, location: string) => {
  pushToDataLayer({
    event: 'button_click',
    buttonName,
    buttonLocation: location,
  });
};

export const trackFormSubmit = (formName: string) => {
  pushToDataLayer({
    event: 'form_submit',
    formName,
  });
};

export const trackModalOpen = (modalName: string) => {
  pushToDataLayer({
    event: 'modal_open',
    modalName,
  });
};

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}
