import {Logo} from "@/assets/logo";

interface EmailTemplateProps {
  link?: string;
  token?: string;
  ctaText: string;
  contextText: string;
}

function EmailTemplate({link, ctaText, contextText}: EmailTemplateProps) {
  return (
    <div style={{padding: "1rem", border: "1px", borderColor: "#cccccc", borderRadius: "0.5rem"}}>
      <Logo />
      <p>{contextText}</p>
      <p>
        <strong>Don&apos;t share this email with anyone.</strong>
      </p>
      <p>Complete the process by clicking on the button &quot;{ctaText}&quot;:</p>
      <p>
        <a href={link}>{ctaText}</a>
      </p>
      <p>Or copy and paste the following url in your browser:</p>
      <p>
        <a href={link}>{link}</a>
      </p>
    </div>
  );
}

export {EmailTemplate};
