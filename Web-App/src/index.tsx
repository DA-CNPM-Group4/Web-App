import React, { useContext } from "react";
import { createRoot } from "react-dom/client";
import * as eva from "@eva-design/eva";
import { registerRootComponent } from "expo";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import Login from "./containers/login";
import { Route, Router, Routes } from "./utils/router";
import { Platform } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { MainLayout } from "./components/layout/MainLayout";

const queryClient = new QueryClient();

export const App = () => {
  //   if (auth.user?.accessToken) {
  //     return (
  //       <MainLayout>
  //         <Routes>
  //           <Route path="/test" element={<Document />} />
  //         </Routes>
  //       </MainLayout>
  //     );
  //   }

  return <Login />;
};

export const Root = () => {
  return (
    <React.Fragment>
      {/* <AuthenticationProvider>
        <NavigationProvider> */}
      <Router>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ApplicationProvider>
      </Router>
      {/* </NavigationProvider>
      </AuthenticationProvider> */}
    </React.Fragment>
  );
};

if (Platform.OS == "web") {
  const rootTag = createRoot(
    document.getElementById("root") ?? document.getElementById("main")
  );
  rootTag.render(React.createElement(Root));
} else {
  registerRootComponent(Root);
}
