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
import CreateTrip from "./containers/createtrip";
import ListOrder from "./containers/listorder";
import Drivers from "./containers/drivers";
import Customers from "./containers/customers";
import Info from "./containers/info";
import TripInfo from "./containers/tripinfo";

const queryClient = new QueryClient();
const token = false;

export const App = () => {
  if (true) {
    return (
      <MainLayout>
        <Routes>
          <Route path="/" element={<ListOrder />} />
          <Route path="/create" element={<CreateTrip />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/info" element={<Info />} />
          <Route path="/tripinfo" element={<TripInfo />} />
        </Routes>
      </MainLayout>
    );
  }

  return <Login />;
};

export const Root = () => {
  return (
    <React.Fragment>
      {/* <AuthenticationProvider> */}
      <Router>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ApplicationProvider>
      </Router>
      {/* </AuthenticationProvider> */}
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
