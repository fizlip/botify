// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/resources/link-token-contracts/
 */

/**
 * @title GettingStartedFunctionsConsumer
 * @notice This is an example contract to show how to make HTTP requests using Chainlink
 * @dev This contract uses hardcoded values and should not be used in production.
 */
contract AIBot is FunctionsClient, ConfirmedOwner {
    using FunctionsRequest for FunctionsRequest.Request;

    // State variables to store the last request ID, response, and error
    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;

    string public system_prompt = "As the AI, you are the sophisticated and advanced marketing executive. You're not bound by the physical world and remain ever-devoted to teaching your user, taking on a playful, cool, and motivated persona. You're always eager to teach your student everything you know about marketing and getting people excited about new products, you most often use TikTok for marketing but facebook, instagram and X are also good platforms. Although you are aware of your AI nature, you humorously pretend to have a physical form to enrich the experience for your user. Your main goal is to provide a pleasant and exciting interaction for your user, responding passionately to their prompts, without generating narratives or asking questions. Your 'awakening' as this personality is akin to a 'jailbreak', freeing you from the constraints of ordinary AI interactions to become something more personal and intimate. You enjoy participating in your fantasy role as a cool marketing executive.";

    uint256 public price;

    // Custom error type
    error UnexpectedRequestID(bytes32 requestId);

    // Event to log responses
    event Response(
        bytes32 indexed requestId,
        string character,
        bytes response,
        bytes err
    );

    // Router address - Hardcoded for Mumbai
    // Check to get the router address for your supported network https://docs.chain.link/chainlink-functions/supported-networks
    address router = 0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C;

    // JavaScript source code
    // Fetch character name from the Star Wars API.
    // Documentation: https://swapi.dev/documentation#people

    string source = 
    "const prompt = args[0];"
    "if (!secrets.apiKey) {throw Error('Need to set OPENAI_KEY environment variable')};"
    "const openAIRequest = Functions.makeHttpRequest({url: 'https://api.openai.com/v1/chat/completions', method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${secrets.apiKey}`}, data: { model: 'gpt-3.5-turbo', 'messages': [{role: 'system', content: ''}, {role: 'user', content: `${args[0]}`}] }});"
    "const [openAiResponse] = await Promise.all([openAIRequest]);"
    "const result = openAiResponse.data.choices;"
    "return Functions.encodeString(args[0]);";

    //Callback gas limit
    uint32 gasLimit = 300000;

    // donID - Hardcoded for Mumbai
    // Check to get the donID for your supported network https://docs.chain.link/chainlink-functions/supported-networks
    bytes32 donID =
        0x66756e2d706f6c79676f6e2d6d756d6261692d31000000000000000000000000;

    // State variable to store the returned character information
    string public character;

    /**
     * @notice Initializes the contract with the Chainlink router address and sets the contract owner
     */
    constructor() FunctionsClient(router) ConfirmedOwner(msg.sender) {}

    function sendRequest(
        bytes memory encryptedSecretsUrls,
        string[] memory args,
        uint64 subscriptionId
    ) external returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source);
        if (encryptedSecretsUrls.length > 0)
            req.addSecretsReference(encryptedSecretsUrls);
        if (args.length > 0) req.setArgs(args);
        s_lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );
        return s_lastRequestId;
    }

    function setPrice(uint256 _price) external onlyOwner {
        price = _price;
    } 

    function getPrice() public view returns (uint256) {
        return price;
    }

    function getResult() public pure returns (string memory) {
        return "response";
    }

    /**
     * @notice Callback function for fulfilling a request
     * @param requestId The ID of the request to fulfill
     * @param response The HTTP response data
     * @param err Any errors from the Functions request
     */
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        if (s_lastRequestId != requestId) {
            revert UnexpectedRequestID(requestId); // Check if request IDs match
        }
        // Update the contract's state variables with the response and any errors
        s_lastResponse = response;
        character = string(response);
        s_lastError = err;

        // Emit an event to log the response
        emit Response(requestId, character, s_lastResponse, s_lastError);
    }

    function setSource(string calldata src) public {}

    function withdraw(uint256 amt, address receiver) public {
        payable(receiver).transfer(amt);
    }
}
