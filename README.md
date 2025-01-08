# React Pagination Table with Search and Row Selection

This project demonstrates a React-based implementation of a dynamic, paginated table that includes:
- Search functionality with debouncing.
- Row selection with checkboxes (including a "select all" feature).
- Pagination with customizable rows per page.
- Optimized performance using `useCallback`, `useMemo`, and debouncing.

---

## Features

1. **Dynamic Table:**
   - Displays data fetched from an API.
   - Includes checkboxes for row selection and a "select all" option.
   
2. **Search with Debouncing:**
   - Prevents unnecessary API calls by delaying search updates until the user stops typing.

3. **Custom Pagination:**
   - Includes navigation to the first, previous, next, and last pages.
   - Allows users to customize rows per page with increment and decrement buttons.

4. **Optimized Performance:**
   - Uses `React.memo` to prevent unnecessary re-renders.
   - Utilizes `useCallback` for memoizing functions and `useMemo` for derived data.

---

## Thought Process and Implementation

### Step 1: Project Setup
- Initialized the project using `vite`.
- Installed `axios` for handling API requests.

---

### Step 2: Component Breakdown
The application was split into modular, reusable components:
1. **App.jsx**: Handles the global state (`currentPage`, `searchQuery`, `rowsPerPage`) and coordinates the components.
2. **Table.jsx**: Displays the fetched data, handles row selection, and integrates checkboxes.
3. **SearchBar.jsx**: Provides a debounced input for filtering data.
4. **Pagination.jsx**: Manages page navigation and rows-per-page customization.

---

### Step 3: API Integration
- Integrated `axios` to fetch data dynamically based on `currentPage`, `rowsPerPage`, and `searchQuery`.

**Key API Endpoints:**
- Base URL: `https://api.razzakfashion.com`
- Example: `https://api.razzakfashion.com/?paginate=10&search=John`

---

### Step 4: Implementing Features
#### **1. Search Functionality with Debouncing**
- Added a `localQuery` state in `SearchBar` to manage input changes locally.
- Used a `setTimeout` to delay the `onSearch` function execution by 300ms.
- Cleared the timeout on input change to avoid unnecessary API calls.

**Code Example:**
```jsx
useEffect(() => {
  const delayDebounce = setTimeout(() => {
    onSearch(localQuery);
  }, 300);

  return () => clearTimeout(delayDebounce);
}, [localQuery, onSearch]);
```

---

#### **2. Pagination Controls**
- Added buttons for navigating to the first, previous, next, and last pages.
- Dynamically calculated the total number of pages using the `last_page` value from the API response.

**Code Example:**
```jsx
<button onClick={() => onPageChange(1 - currentPage)} disabled={currentPage === 1}>
  |&lt;
</button>
<button onClick={() => onPageChange(-1)} disabled={currentPage === 1}>
  &lt;
</button>
<span>Page {currentPage} of {totalPages}</span>
<button onClick={() => onPageChange(1)} disabled={currentPage === totalPages}>
  &gt;
</button>
<button onClick={() => onPageChange(totalPages - currentPage)} disabled={currentPage === totalPages}>
  &gt;|
</button>
```

---

#### **3. Rows Per Page Customization**
- Added increment (`↑`) and decrement (`↓`) buttons to adjust rows per page dynamically.
- Prevented the value from going below 1.

**Code Example:**
```jsx
<button onClick={() => setRowsPerPage((prev) => Math.max(prev - 1, 1))}>↓</button>
<button onClick={() => setRowsPerPage((prev) => prev + 1)}>↑</button>
```

---

#### **4. Optimizing Table Rendering**
- Used `React.memo` to prevent re-renders when props haven’t changed.
- Added a `useCallback` hook to memoize `fetchData` and other event handlers.

**Code Example:**
```jsx
const fetchData = useCallback(async (page) => {
  setLoading(true);
  try {
    const response = await axios.get(
      `https://api.razzakfashion.com/?paginate=${rowsPerPage}&search=${searchQuery}`,
      { params: { page } }
    );
    setData(response?.data?.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setLoading(false);
  }
}, [rowsPerPage, searchQuery]);
```

---

### Step 5: Performance Improvements
#### **Why Use `useCallback` and `React.memo`?**
- `React.memo`: Prevents a component from re-rendering if its props haven’t changed.
- `useCallback`: Ensures that the function reference remains the same between renders unless dependencies change, preventing unnecessary re-renders in child components.

**Result:** Reduced re-renders for `Table`, `SearchBar`, and `Pagination`.

#### **Why Use Debouncing?**
- Avoids API calls on every keystroke.
- Improves performance and reduces server load.

---

## Running the Project

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```


---

## Key Points to Highlight
1. **Dynamic Search**:  
   - Leveraged `debouncing` to minimize API calls while providing a smooth user experience.  

2. **Custom Pagination**:  
   - Includes navigation to first, previous, next, and last pages.  
   - Dynamically adjusts rows per page.  

3. **Optimized React Usage**:  
   - Used `React.memo` to prevent unnecessary renders.  
   - Utilized `useCallback` to memoize functions.  

---
