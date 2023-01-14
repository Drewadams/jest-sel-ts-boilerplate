<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/tQdcaFa.jpeg" alt="Project logo"></a>
</p>

<h3 align="center">jest-sel-ts-boilerplate</h3>

---

<p align="center"> This is a repo for quick Selenium setups using TypeScript and Jest.
    <br> 
</p>

## 🏁 Running Tests <a name = "run_tests"></a>

### Install

Clone the repo:

```
git clone <repo_name>
cd <repo_name>
```

Install Node modules:

```
npm install
```

### Running tests

To run all tests:

```
npm test
```

For a single test, use the -t flag:

```
npm test -- -t "test_name"
```

For a single test file:

```
npm test -- "test_file_name"
```

To run the tests in watch mode (run on save):

```
npm run test:watch
```

To view the report as an html file:

```
npm run test:report
```
