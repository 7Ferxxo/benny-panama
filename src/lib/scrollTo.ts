export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  const offset = 80;
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}
