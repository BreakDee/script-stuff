const prompt = "Hello, how are you today?";
const apiKey = "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";
api() {
    fetch("https://api.openai.com/v1/engine/davinci/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 50,
                n: 1,
                stop: "\n"
            })
        })
        .then(response => response.json())
        .then(data => console.log(data.choices[0].text));
}
