import { useState } from "react";
import { useLoadingScreen } from "../../hooks/useLoadingScreen";

interface Message {
  id: number;
  title: string;
  sender: string;
  body: string | string[];
  inReplyTo?: Message;
}

export default function MessagingApp({ onExit }: { onExit: () => void }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { loadingScreen, loading, setLoading } = useLoadingScreen();
  const selectedMessage = DUMMY_MESSAGES.find((msg) => msg.id === selectedId);

  return (
    <div className="terminal">
      <div className="program messaging-app">
        <header className="program-header">
          <p>Gunnarsson Message Center™</p>
          <p>Authorized Personnel Only</p>
        </header>
        <div className="message-body">
          <div className="message-list">
            <ol>
              {DUMMY_MESSAGES.map((msg) => (
                <li
                  key={msg.id}
                  className={selectedId === msg.id ? "selected" : ""}
                >
                  <button
                    className="inlineBtn"
                    onClick={() => {
                      setLoading(true);
                      setSelectedId(msg.id);
                    }}
                  >
                    [{msg.title}]
                  </button>
                </li>
              ))}
            </ol>
            <button className="inlineBtn messageExitBtn" onClick={onExit}>
              [Exit]
            </button>
          </div>
          <div className="message-content">
            {loading ? (
              <div className="msg-placeholder">{loadingScreen}</div>
            ) : null}
            {selectedMessage && !loading ? (
              <Message msg={selectedMessage} />
            ) : null}
            {!loading && !selectedMessage ? (
              <div className="msg-placeholder">Select a message to read</div>
            ) : null}
          </div>
        </div>
        <footer>
          <p>Version 8.66.101</p>
          <p>Clearance: HEATHEN</p>
        </footer>
      </div>
    </div>
  );
}

const Message = ({ msg }: { msg: Message }) => {
  return (
    <>
      <div className="msg-title">{msg.title}</div>
      <div className="msg-sender">From: {msg.sender}</div>
      <br />
      {Array.isArray(msg.body) ? (
        msg.body.map((part, i) => (
          <p key={i} className="msg-body">
            {part}
          </p>
        ))
      ) : (
        <p className="msg-body">{msg.body}</p>
      )}

      {msg.inReplyTo ? (
        <>
          <br />
          ---------------------------
          <br />
          <Message msg={msg.inReplyTo} />
        </>
      ) : null}
    </>
  );
};

const DUMMY_MESSAGES: Message[] = [
  {
    id: 93,
    title: "NÖDLÄGE: Följ instruktionerna NU",
    sender: "Inga Lindholm <inga.lindholm@gunnarsson.se>",
    body: [
      "Ralf!",
      "Om du inte svarar nu måste jag kontakta Erika direkt. Du riskerar hela företagets chans på Novatech-kontraktet.",
      "Slå på trackern, stäng av all störsändning, logga in på live-länken och bekräfta att du är redo. Det är inte svårt!",
      "Jag orkar inte täcka upp för dig längre. Gör bara som du blivit tillsagd! Snälla!",
      "",
      "Inga",
    ],
    inReplyTo: {
      id: 92,
      title: "Ralf, det här är allvar",
      sender: "Inga Lindholm <inga.lindholm@gunnarsson.se>",
      body: [
        "Ralf,",
        "Jag har försökt nå dig hela dagen. Erika kommer fråga mig om dig och jag har inget svar.",
        "Du måste slå på trackern, logga in på systemet och dubbelkolla att din offert är redo att skickas in innan klockan tio.",
        "Jag ber dig, gör det nu.",
        "",
        "Inga",
      ],
      inReplyTo: {
        id: 91,
        title: "Vänligen återkoppla",
        sender: "Inga Lindholm <inga.lindholm@gunnarsson.se>",
        body: [
          "Ralf,",
          "Trackern fungerar fortfarande inte. Jag börjar bli orolig. Vi måste kunna visa att du är på plats och redo.",
          "Snälla, slå av störsändaren och bekräfta att du har tillgång till live-länken för offerten.",
          "",
          "Det är viktigt, Inga",
        ],
        inReplyTo: {
          id: 90,
          title: "Statusuppdatering behövs",
          sender: "Inga Lindholm <inga.lindholm@gunnarsson.se>",
          body: [
            "Hej Ralf,",
            "Jag ser att din tracker har varit offline ett tag. Kan du slå på den igen? Vi behöver bekräfta att du är på plats inför Novatech-upphandlingen.",
            "Det räcker om du startar om enheten och ser till att störsändaren är avstängd.",
            "",
            "Tack på förhand.",
            "Inga",
          ],
        },
      },
    },
  },
  {
    id: 52,
    title: "First Trial",
    sender: "tuesday@fimbulnet.org",
    body: [
      "Hralf.",
      "A warrior who does not think is only a fool with a sword.",
      "Where steel drifts in the salt fog, the Many-Mouthed One waits.",
      "Feed her the silent gift, and do not speak her name.",
      "If you need a guide, seek the one who knows monsters by heart.",
      "",
      "-Tuesday",
    ],
  },
  {
    id: 45,
    title: "Traffa singelvikingar i din område!",
    sender: "SagaMatch <love@sagamatch.se>",
    body: `Ensam pa din langbat? Hitta skoldmo eller barsark nara dig! SagaMatch koppla dig med mest stark hjartan i nor. Registrer nu och fa forsta raid gratis!\n\nFor ara och vanskapp!`,
  },
  {
    id: 43,
    title: "Din Valkyrie-forsikring utløper snart!",
    sender: "Valkyrie Forsikring <valkyrie@asgardcover.no>",
    body: [
      "Kjære skjoldbærer",
      "Våre registre viser at din etterlivsforsikring snart utløper. Forny nå for å sikre deg en plass i Valhall. Ikke risiker Helheim - klikk her for å forlenge dekningen!",
      "",
      "Må Nornene være med deg, ",
      "Valkyrie Forsikring",
    ], //``,
  },
  {
    id: 22,
    title: "RE: Allt bra?",
    sender: "Erika Gunnarsson-Malmstein <erika.gm@skandgov.se>",
    body: [
      "Hej igen Ralf,",
      "Jag vill bara påminna dig om avtalet inför Novatech-upphandlingen ikväll. Det är viktigt att du håller dig till planen och att vi visar oss på bästa sätt.",
      "Så glöm inte lämna in budet innan klockan tio ikväll.",
      "Lycka till! Vi räknar med dig.",
      "",
      "Kram, Mamma",
    ],
    inReplyTo: {
      id: 20,
      title: "RE: Allt bra?",
      sender: "Ralf Gunnarsson <ralf.gunnarsson@gunnarsson.se>",
      body: [
        `Hej Mamma!`,
        "Pff, än så länge har alla skumma typer hållit sig borta från en så pass mäkig viking som mig. Så du har inget att oroa dig för.",
        "Ja, jag ska varken glömma varken delegationen eller att äta.",
        "",
        "Hälsningar",
        "Hralf",
      ],
      inReplyTo: {
        id: 19,
        title: "Allt bra?",
        sender: "Erika Gunnarsson-Malmstein <erika.gm@skandgov.se>",
        body: [
          "Hej Ralf,",
          "Har du det bra i Seattle?  Du håller dig väl borta från skumma typer och undviker att dra onödig uppmärksamhet till familjen? Vi har redan haft nog med journalister som gräver i våra affärer.",
          "Glöm inte mötet med delegationen från Transys Neuronet nästa helg. Det är viktigt att du gör ett gott intryck.",
          "Ät ordentligt och hör av dig om du behöver något",
          "",
          "Älskar dig",
          "- Mamma",
        ],
      },
    },
  },
  {
    id: 21,
    title: "Påminnelse: Uppdraget",
    sender: "Anders Malmstein <anders.malmstein@erika.fi>",
    body: [
      "Ralf,",
      "Som vi diskuterade; röd, blå, gul, grön. De måste återfås.",
      "Kontakterna är informerade. Följ planen.",
      "Tiden är knapp och mycket står på spel.",
      "Inga misstag.",
      "Morfar",
    ],
  },
  {
    id: 3,
    title: "RE:RE:RE:RE:RE:RE:RE:RE:Lunch Plans",
    sender: "Sven",
    body: "Anyone up for lunch at 12:30?",
    inReplyTo: {
      id: 3,
      title: "RE:RE:RE:RE:RE:RE:RE:Lunch Plans",
      sender: "Sven",
      body: "Anyone up for lunch at 12:30?",
      inReplyTo: {
        id: 3,
        title: "RE:RE:RE:RE:RE:RE:Lunch Plans",
        sender: "Sven",
        body: "Anyone up for lunch at 12:30?",
        inReplyTo: {
          id: 3,
          title: "RE:RE:RE:RE:RE:Lunch Plans",
          sender: "Sven",
          body: "Anyone up for lunch at 12:30?",
          inReplyTo: {
            id: 3,
            title: "RE:RE:RE:RE:Lunch Plans",
            sender: "Sven",
            body: "Anyone up for lunch at 12:30?",
            inReplyTo: {
              id: 3,
              title: "RE:RE:RE:Lunch Plans",
              sender: "Sven",
              body: "Anyone up for lunch at 12:30?",
              inReplyTo: {
                id: 3,
                title: "RE:RE:Lunch Plans",
                sender: "Sven",
                body: "Anyone up for lunch at 12:30?",
                inReplyTo: {
                  id: 4,
                  title: "RE:Lunch Plans",
                  sender: "Sven",
                  body: "Anyone up for lunch at 12:30?",
                  inReplyTo: {
                    id: 3,
                    title: "Lunch Plans",
                    sender: "Sven",
                    body: "Anyone up for lunch at 12:30?",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    id: 61,
    title: "Morning Brief: News & Rumors",
    sender: "NewsNet (NN) <brief@newsnet.sea>",
    body: [
      "Good morning,",
      "",
      "Here are today's top stories and rumors from across the sprawl:",
      "",
      "• Tensions escalate in Aztlan as Yucatan separatists are accused of destabilizing the region. Government officials urge unity and denounce rebel activity.",
      "",
      "• Preachables Soy-Chokladkakor are flying off shelves. The nearly-natural snack is a hit with consumers, and scalpers are charging triple retail on the shadow market.",
      "",
      "• Polymetal's collapse sends shockwaves through the business world. After decades of success under Sampson Kilgore, his son Ezekiel sold the company following a notorious trip to Peru. Orichalcum output plummets.",
      "",
      "• Trideo star Alice Straightlacé cancels tonight's appearance. Rumors suggest a botched cosmetic procedure is to blame.",
      "",
      "Stay tuned for further updates.",
      "",
      "— NewsNet (NN), a Horizon Group company",
    ],
  },
  {
    id: 41,
    title: "Erbjudande: Lås upp din inre bärsärk!",
    sender: "Ulfhednar Fitness <berserk@wolfstrength.no>",
    body: [
      "Trött på att känna dig svag i sköldmuren?",
      "Vårt patenterade Ulfhednar-träningsprogram släpper lös din inre best. De 100 första får ett gratis vargpälshårband!",
      "Förvandla dig idag - Valhall väntar de starka.",
      "",
      "Inga runor krävs. Resultat kan variera.",
    ],
  },
  {
    id: 10,
    title: "RE: Inquiry about Fimbulvetr Project",
    sender: "Fenrir <fenrir@fimbulnet.org>",
    body: [
      "Hralf,",
      "Alright, you're for real. Sorry for the suspicion, but you can't be too careful these days.",
      "If you're interested in what we discussed, meet me in Tacoma tonight at 22:00. Address attached.",
      "",
      "- Fenrir",
    ],
    inReplyTo: {
      id: 9,
      title: "RE: Inquiry about Fimbulvetr Project",
      sender: "Hralf <hralf@theviking.se>",
      body: [
        "No, I'm not a cop. Here's my SIN as proof. [Attachment: SIN.jpg]",
        "",
        "- Hralf",
      ],
      inReplyTo: {
        id: 8,
        title: "RE: Inquiry about Fimbulvetr Project",
        sender: "Fenrir <fenrir@fimbulnet.org>",
        body: ["Who are you? Are you with the police? Prove you're not a cop."],
        inReplyTo: {
          id: 7,
          title: "Inquiry about Fimbulvetr Project",
          sender: "Hralf <hralf@theviking.se>",
          body: [
            "Hi,",
            "Saw your post on FimbulNet about the Fimbulvetr project. I'm looking for more information and maybe some contacts. Let me know if you're willing to talk.",
            "",
            "- Hralf",
          ],
        },
      },
    },
  },
];
