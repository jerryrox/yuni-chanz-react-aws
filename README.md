# yuni-chanz-react-aws
AWS integration plugin for yuni-chanz-react.

## Versions
### 0.0.4 (WIP)
#### New features
- Added `AttributeExpression` class to easily build attribute update expressions for DDB.
#### Fixes
- Fixed `DdbUtils` class not being exported in `index.ts`.

### 0.0.3
#### Changes
- Moved away logics converting values to DDB `AttributeValue` to `DdbUtils` class.

### 0.0.2
#### New features
- Added more encode/decode functions in `AwsModelConverter`.

### 0.0.1
#### New features
- Implemented abstract API classes for AWS integration.
- Implemented a base AWS model conversion class.