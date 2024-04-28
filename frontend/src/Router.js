import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";

import HomePage from "./pages/Home/HomePage";

const router = createBrowserRouter([
  {
      path: "/",
      element: <HomePage
                  paymentModes={ paymentModes}
                  accounts={accounts}
                  expenseTypes = {expenseTypes}
                  onSubmit={addExpense}
                  modifiedExpenses={modifiedExpenses}
                  applyFilter={applyFilter}
                  resetFilter={resetFilter}
                  months={months}
                  years = {years}
                  expenses={expenses}

      />
  }
]);