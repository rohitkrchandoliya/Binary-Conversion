// Clear the shared error message before each operation.
function clearMessages() {
    document.getElementById("error").textContent = "";
}

function readInteger(id, pattern, radix, label) {
    const raw = document.getElementById(id).value.trim();
    if (!pattern.test(raw)) throw new Error("Invalid " + label + " input.");
    return BigInt(radix === 10 ? raw : (radix === 2 ? "0b" + raw : radix === 8 ? "0o" + raw : "0x" + raw));
}

function showError(error) {
    document.getElementById("error").textContent = error.message;
}

function convert(id, pattern, radix, outputId, outputLabel, outputRadix, inputLabel) {
    clearMessages();
    try {
        const value = readInteger(id, pattern, radix, inputLabel);
        document.getElementById(outputId).textContent = outputLabel + ": " + value.toString(outputRadix).toUpperCase();
    } catch (error) {
        showError(error);
    }
}

function binToDec() { convert("binToDecInput", /^[01]+$/, 2, "binToDecResult", "Decimal", 10, "binary"); }
function binToHex() { convert("binToHexInput", /^[01]+$/, 2, "binToHexResult", "Hexadecimal", 16, "binary"); }
function binToOct() { convert("binToOctInput", /^[01]+$/, 2, "binToOctResult", "Octal", 8, "binary"); }
function decToBin() { convert("decToBinInput", /^\d+$/, 10, "decToBinResult", "Binary", 2, "decimal"); }
function decToHex() { convert("decToHexInput", /^\d+$/, 10, "decToHexResult", "Hexadecimal", 16, "decimal"); }
function decToOct() { convert("decToOctInput", /^\d+$/, 10, "decToOctResult", "Octal", 8, "decimal"); }
function hexToBin() { convert("hexToBinInput", /^[0-9A-Fa-f]+$/, 16, "hexToBinResult", "Binary", 2, "hexadecimal"); }
function hexToDec() { convert("hexToDecInput", /^[0-9A-Fa-f]+$/, 16, "hexToDecResult", "Decimal", 10, "hexadecimal"); }
function hexToOct() { convert("hexToOctInput", /^[0-9A-Fa-f]+$/, 16, "hexToOctResult", "Octal", 8, "hexadecimal"); }
function octToBin() { convert("octToBinInput", /^[0-7]+$/, 8, "octToBinResult", "Binary", 2, "octal"); }
function octToDec() { convert("octToDecInput", /^[0-7]+$/, 8, "octToDecResult", "Decimal", 10, "octal"); }
function octToHex() { convert("octToHexInput", /^[0-7]+$/, 8, "octToHexResult", "Hexadecimal", 16, "octal"); }

function binaryCalculator() {
    clearMessages();
    const left = document.getElementById("binCalcInput1").value.trim();
    const right = document.getElementById("binCalcInput2").value.trim();
    const operation = document.getElementById("calcOperation").value;

    if (!/^[01]+$/.test(left) || !/^[01]+$/.test(right)) {
        document.getElementById("error").textContent = "Enter valid binary integers for both operands.";
        return;
    }

    const num1 = BigInt("0b" + left);
    const num2 = BigInt("0b" + right);
    let result;

    switch (operation) {
        case "add": result = num1 + num2; break;
        case "sub": result = num1 - num2; break;
        case "mul": result = num1 * num2; break;
        case "div":
            if (num2 === 0n) {
                document.getElementById("error").textContent = "Cannot divide by zero.";
                return;
            }
            // Binary calculator arithmetic is integer arithmetic; division truncates toward zero.
            result = num1 / num2;
            break;
        default:
            document.getElementById("error").textContent = "Invalid operation.";
            return;
    }

    document.getElementById("binCalcResult").textContent = "Result (binary): " + result.toString(2);
}
