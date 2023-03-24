import { Platform } from 'react-native';

import { NativeRouter, Route as NativeRoute, Routes as NativeRoutes } from 'react-router-native';
import { BrowserRouter, Route as WebRoute, Routes as WebRoutes } from 'react-router-dom';

export const Router = Platform.OS == 'web' ? BrowserRouter : NativeRouter;
export const Routes = Platform.OS == 'web' ? WebRoutes : NativeRoutes;
export const Route = Platform.OS == 'web' ? WebRoute : NativeRoute;