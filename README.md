# CPH VS Code Extension (LeetCode)

CPH Leetcode is a Visual Studio Code extension that simplifies competitive programming by bringing Leetcode functionalities directly to your workspace. With streamlined workflows for problem-solving, fetching test cases, and running solutions, this extension empowers you to focus on coding without distractions.

## 🚀 Features

- **Leetcode Integration**: Fetch and solve problems directly within VS Code.
- **Test Case Management**: Retrieve and save sample test cases locally for Leetcode problems.
- **Solution Execution**: Run your code against the fetched test cases with instant results.
- **Custom Activity Bar**: Access all features through a dedicated UI in the VS Code activity bar.
- **Error Highlighting**: Identify mismatches between expected and actual outputs instantly.

## 🛠️ Usage

1. Open the **CPH Leetcode** view in the activity bar.
2. Use the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) to access these commands:
   - **FetchTestCases**: Retrieve test cases for a specific Leetcode problem.
   - **RunTestCases**: Run your code against the stored test cases.
3. Alternatively, interact directly with the custom UI in the activity bar.

---

## 📚 Supported Languages

- **C++**
- **Python**

## 🏗️ Project Structure

- **`helper-functions/`**: Utilities for test case handling and UI generation.
- **`extension.js`**: Core logic for the extension.
- **`pupp.js`**: Web scraping puppeteer file