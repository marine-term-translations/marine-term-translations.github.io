import React, { useEffect, useState } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Lowlight from "react-lowlight";
import "bootstrap/dist/css/bootstrap.min.css";
import javascript from "highlight.js/lib/languages/javascript";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import html from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";
import "highlight.js/styles/default.css";
import { MermaidDiagram } from "@lightenna/react-mermaid-diagram";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

Lowlight.registerLanguage("js", javascript);
Lowlight.registerLanguage("javascript", javascript);
Lowlight.registerLanguage("bash", bash);
Lowlight.registerLanguage("json", json);
Lowlight.registerLanguage("sh", bash);
Lowlight.registerLanguage("shell", bash);
Lowlight.registerLanguage("html", html);
Lowlight.registerLanguage("http", html);
Lowlight.registerLanguage("yaml", yaml);

const MarckdownViewer = ({ fullLink = null }) => {
  const { t } = useTranslation();
  const [link, setLink] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mdContent, setMdContent] = useState("");
  useEffect(() => {
    if (window.mermaid) {
      window.mermaid.init();
    }
  }, [mdContent]);
  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const response = await fetch(fullLink);
        let text = await response.text();

        const urlParts = fullLink.split("/");
        const baseUrl = urlParts.slice(0, urlParts.length - 1).join("/");

        text = text.replace(
          /!\[([^\]]*)]\(([^)]+)\)/g,
          (match, altText, imgUrl) => {
            if (!imgUrl.startsWith("http")) {
              imgUrl = `${baseUrl}/${imgUrl}`;
            }
            return `![${altText}](${imgUrl})`;
          }
        );

        if (fullLink.includes("raw.githubusercontent.com")) {
          let githubUrl = fullLink.replace(
            "raw.githubusercontent.com",
            "github.com"
          );
          githubUrl = githubUrl.replace("/main/", "/blob/main/");
          setLink(githubUrl);
        }

        setMdContent(text);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching Marckdown:", error);
        setLoading(false);
        setError(t("pages.errorLoadingContent"));
      }
    };

    if (fullLink) {
      fetchReadme();
    }
  }, [fullLink, t]);

  const getFirstLine = (text) => {
    const lines = text.split("\n");
    return lines[0].slice(2);
  };

  if (!fullLink) {
    return (
      <Container className="text-center mt-5 m-auto">
        <Alert variant="danger">{t("pages.linkNotFilled")}</Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="text-center m-5">
        <Spinner animation="border" />
        <p>{t("pages.loading")}</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!mdContent) {
    return <div>{t("pages.errorLoadingContent")}</div>;
  }

  const firstLine = getFirstLine(mdContent);

  return (
    <Container className="mt-5">
      {firstLine && (
        <h1 className="m-5" style={{ textAlign: "center" }}>
          <a href={link}>{firstLine}</a>
        </h1>
      )}
      <ReactMarkdown
        children={mdContent.split("\n").slice(1).join("\n")}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          [rehypeHighlight, { languages: { javascript, bash, json } }],
        ]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            if (match && match[1] === "mermaid") {
              return <MermaidDiagram>{children}</MermaidDiagram>;
            }
            return !inline && match ? (
              <Lowlight
                language={match[1]}
                value={String(children).replace(/\n$/, "")}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
      <br />
    </Container>
  );
};

export default MarckdownViewer;
