import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const lang = localStorage.getItem('lang') || 'es';
  const isFormData = req.body instanceof FormData;

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        // lenguaje u otros headers comunes
        //'Accept-Language': languageService.getLanguageInfo(lang, 'key') as string || 'es-ES',
        'Accept-Language': lang as string || 'es',
      }
    });
    return next(cloned);
  }

  return next(req);
};
