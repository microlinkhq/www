import React from 'react'
import { CDN_EDGES } from 'helpers/cdn-edges'
import { Link } from 'components/elements/Link'
import { ACCENT } from 'components/pages/pdf/shared'

const Accent = ({ children }) => (
  <span style={{ color: ACCENT }}>{children}</span>
)

const PAGE_URL = 'https://microlink.io/pdf/java'
const OG_IMAGE = 'https://cdn.microlink.io/banner/pdf.jpeg'

const java = {
  lang: 'java',
  label: 'Java',

  meta: {
    title: 'Java HTML to PDF API without a headless browser',
    description:
      'Convert any URL to a pixel-perfect PDF in Java with one HTTP request — no Flying Saucer, no browser to ship. Works with Spring Boot and Quarkus.',
    image: OG_IMAGE,
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'HTML to PDF API for Java',
        name: 'HTML to PDF API for Java',
        description:
          'A developer guide to converting web pages to PDF programmatically in Java over the Microlink REST API — request, convert, framework integration, and deployment without running Flying Saucer, openhtmltopdf, or a headless browser on the JVM.',
        url: PAGE_URL,
        image: OG_IMAGE,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'Java 11+, Jackson (optional)',
        keywords:
          'java html to pdf api, url to pdf java, convert webpage to pdf java, generate pdf from html java, spring boot pdf, flying saucer alternative',
        author: {
          '@type': 'Organization',
          name: 'Microlink',
          url: 'https://microlink.io'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Microlink',
          url: 'https://microlink.io',
          logo: {
            '@type': 'ImageObject',
            url: 'https://cdn.microlink.io/logo/logo.png'
          }
        },
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://microlink.io',
          url: 'https://microlink.io',
          name: 'Microlink'
        },
        about: {
          '@type': 'SoftwareApplication',
          name: 'Microlink PDF API',
          url: 'https://microlink.io/pdf',
          applicationCategory: ['DeveloperApplication', 'WebAPI']
        },
        mainEntityOfPage: PAGE_URL
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Microlink',
            item: 'https://microlink.io'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'PDF API',
            item: 'https://microlink.io/pdf'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Java',
            item: PAGE_URL
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': `${PAGE_URL}#howto`,
        name: 'How to convert a URL to PDF in Java',
        description:
          'Convert any URL into a PDF document in Java with one HTTP request to the Microlink API in three steps.',
        tool: [
          { '@type': 'HowToTool', name: 'Java' },
          { '@type': 'HowToTool', name: 'java.net.http.HttpClient' }
        ],
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Send the request',
            text: 'Make an HTTP GET to api.microlink.io with the url and pdf parameters.',
            url: `${PAGE_URL}#quickstart`
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Read the PDF URL',
            text: 'Parse the JSON response and read the hosted document from data.pdf.url.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Use the PDF URL',
            text: 'Serve the hosted document to your users or save it to disk.'
          }
        ]
      }
    ]
  },

  breadcrumb: [{ label: 'PDF API', href: '/pdf' }, { label: 'Java' }],

  hero: {
    title: (
      <>
        <Accent>Java</Accent> HTML to PDF API
      </>
    ),
    subtitle:
      'Convert any URL into a pixel-perfect PDF with one HTTP request in Java — no rendering library, no headless browser on the JVM, no servers to maintain.',
    primaryCta: { label: 'Get started free', href: '#quickstart' },
    secondaryCta: {
      label: 'Read the docs',
      href: '/docs/guides/pdf'
    }
  },

  quickstart: {
    title: (
      <>
        Convert a URL to <Accent>PDF</Accent> in Java
      </>
    ),
    caption:
      'No PDF library and no browser on the classpath — the Microlink REST API turns any URL into a hosted PDF with a single HTTP GET. Here it is with the HttpClient that ships in the JDK since Java 11.',
    steps: [
      {
        title: 'Convert any URL',
        description:
          'The JDK HTTP client is all you need — no dependency to add to your pom.xml. Point it at a page and the JSON response carries the hosted document.',
        code: {
          language: 'java',
          title: 'Convert.java',
          source: `import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

public class Convert {
  public static void main(String[] args) throws Exception {
    String url = URLEncoder.encode("https://example.com", StandardCharsets.UTF_8);

    // meta=false skips metadata extraction for a faster response
    HttpRequest request = HttpRequest
      .newBuilder(URI.create("https://api.microlink.io?url=" + url + "&pdf=true&meta=false"))
      .GET()
      .build();

    HttpResponse<String> response = HttpClient
      .newHttpClient()
      .send(request, HttpResponse.BodyHandlers.ofString());

    System.out.println(response.body());
  }
}`
        }
      },
      {
        title: 'Read the document URL',
        description:
          'The JDK has no JSON parser, so pick the one you already use. With Jackson (com.fasterxml.jackson.core:jackson-databind) the hosted PDF is a single pointer lookup away.',
        code: {
          language: 'java',
          title: 'ReadUrl.java',
          source: `import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

ObjectMapper mapper = new ObjectMapper();
JsonNode body = mapper.readTree(response.body());

// {"status":"success","data":{"pdf":{"url":"https://cdn.microlink.io/…"}}}
String pdfUrl = body.at("/data/pdf/url").asText();

if (pdfUrl.isEmpty()) {
  throw new IllegalStateException(body.at("/message").asText("Malformed response"));
}

System.out.println(pdfUrl);`
        }
      },
      {
        title: 'Customize the document',
        description:
          'Paper format, margins, orientation, and print CSS are all query fields. Nested options use dot notation, and every value goes through URLEncoder.',
        code: {
          language: 'java',
          title: 'Options.java',
          source: `String url = URLEncoder.encode("https://example.com", StandardCharsets.UTF_8);

String query = String.join("&",
  "url=" + url,
  "pdf.format=A4",        // A0-A6 | Letter | Legal | Ledger | Tabloid
  "pdf.margin=0.35cm",    // px, in, cm or mm
  "pdf.landscape=false",  // portrait (default) | landscape
  "mediaType=print",      // print (the default for pdf) | screen
  "meta=false");

HttpRequest request = HttpRequest
  .newBuilder(URI.create("https://api.microlink.io?" + query))
  .build();`
        }
      },
      {
        title: 'Save it to disk',
        description:
          'The response is a hosted PDF URL on a global CDN. Stream it into a file with java.nio, or hand the URL straight to the browser.',
        code: {
          language: 'java',
          title: 'Save.java',
          source: `import java.io.InputStream;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

try (InputStream document = URI.create(pdfUrl).toURL().openStream()) {
  Files.copy(document, Path.of("document.pdf"), StandardCopyOption.REPLACE_EXISTING);
}`
        }
      }
    ]
  },

  framework: {
    title: (
      <>
        Drop it into your <Accent>framework</Accent>
      </>
    ),
    caption:
      'A controller, a resource, or a servlet — the same request becomes your ' +
      'own PDF endpoint, perfect for invoice downloads, statements, and report ' +
      'links in Spring Boot, Quarkus, or plain Jakarta EE.',
    examples: [
      {
        id: 'spring-boot',
        label: 'Spring Boot',
        code: {
          language: 'java',
          title: 'PdfController.java',
          source: `package com.example.pdf;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class PdfController {
  private final RestClient client = RestClient.create("https://api.microlink.io");

  // GET /pdf?url=https://example.com
  @GetMapping("/pdf")
  public RedirectView convert(@RequestParam String url) {
    JsonNode body = client
      .get()
      .uri(builder -> builder
        .queryParam("url", url)
        .queryParam("pdf", "true")
        .queryParam("meta", "false")
        .build())
      .retrieve()
      .body(JsonNode.class);

    return new RedirectView(body.at("/data/pdf/url").asText());
  }
}`
        }
      },
      {
        id: 'quarkus',
        label: 'Quarkus',
        code: {
          language: 'java',
          title: 'PdfResource.java',
          source: `package org.acme;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.core.Response;
import java.net.URI;

@Path("/pdf")
public class PdfResource {
  // GET /pdf?url=https://example.com
  @GET
  public Response convert(@QueryParam("url") String url) {
    JsonNode body = ClientBuilder
      .newClient()
      .target("https://api.microlink.io")
      .queryParam("url", url)
      .queryParam("pdf", "true")
      .queryParam("meta", "false")
      .request()
      .get(JsonNode.class);

    return Response.seeOther(URI.create(body.at("/data/pdf/url").asText())).build();
  }
}`
        }
      },
      {
        id: 'servlet',
        label: 'Jakarta EE',
        code: {
          language: 'java',
          title: 'PdfServlet.java',
          source: `package com.example;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

// GET /pdf?url=https://example.com
@WebServlet("/pdf")
public class PdfServlet extends HttpServlet {
  private static final HttpClient CLIENT = HttpClient.newHttpClient();
  private static final ObjectMapper MAPPER = new ObjectMapper();

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
    String url = URLEncoder.encode(req.getParameter("url"), StandardCharsets.UTF_8);

    HttpRequest request = HttpRequest
      .newBuilder(URI.create("https://api.microlink.io?url=" + url + "&pdf=true&meta=false"))
      .build();

    try {
      String body = CLIENT.send(request, HttpResponse.BodyHandlers.ofString()).body();
      res.sendRedirect(MAPPER.readTree(body).at("/data/pdf/url").asText());
    } catch (InterruptedException error) {
      Thread.currentThread().interrupt();
      res.sendError(HttpServletResponse.SC_BAD_GATEWAY);
    }
  }
}`
        }
      },
      {
        id: 'java',
        label: 'Java',
        code: {
          language: 'java',
          title: 'MicrolinkPdf.java',
          source: `package com.example;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;

public final class MicrolinkPdf {
  private static final HttpClient CLIENT = HttpClient.newHttpClient();
  private static final ObjectMapper MAPPER = new ObjectMapper();

  // Non-blocking: the calling thread is free while the page renders
  public static CompletableFuture<String> convert(String url) {
    String query = "url=" + URLEncoder.encode(url, StandardCharsets.UTF_8);

    HttpRequest request = HttpRequest
      .newBuilder(URI.create("https://api.microlink.io?" + query + "&pdf=true&meta=false"))
      .build();

    return CLIENT
      .sendAsync(request, HttpResponse.BodyHandlers.ofString())
      .thenApply(response -> {
        try {
          return MAPPER.readTree(response.body()).at("/data/pdf/url").asText();
        } catch (Exception error) {
          throw new CompletionException(error);
        }
      });
  }
}`
        }
      }
    ]
  },

  comparison: {
    title: (
      <>
        Skip the <Accent>Flying Saucer</Accent> limitations
      </>
    ),
    caption:
      'Generating PDFs on the JVM means fighting the CSS subset of a Java rendering library, wrapping an archived wkhtmltopdf binary, or driving a browser from Selenium next to your application threads. The API gives you a real browser rendering engine without any of the infrastructure.',
    columns: [
      {
        tone: 'negative',
        heading: 'Self-hosted JVM PDF tooling',
        points: [
          'Flying Saucer & openhtmltopdf never run JavaScript, so dynamic pages render blank',
          'They render a CSS subset — modern flexbox and grid layouts break or misalign',
          'wkhtmltopdf wrappers depend on a binary that is archived upstream',
          'Driving Selenium or Playwright means shipping ~300 MB of Chrome in your image',
          'Each browser eats hundreds of MB of heap; thread pools stall under load',
          'You build the process pool, queueing, retries and autoscaling'
        ]
      },
      {
        tone: 'positive',
        heading: 'Microlink for Java',
        points: [
          'One HTTP request with the HttpClient bundled since Java 11',
          'Runs anywhere: Spring Boot, Quarkus, a Lambda, a container, your laptop',
          'Autoscaled managed browser fleet with a 99.9% uptime SLA',
          `Sub-second cached responses from ${CDN_EDGES} edge locations`,
          'A0-A6, Letter, Legal, Ledger & Tabloid — set as query fields',
          'Print stylesheets, custom CSS & DOM interaction on any runtime'
        ]
      }
    ]
  },

  features: {
    title: (
      <>
        Built for the way you write <Accent>Java</Accent>.
      </>
    ),
    caption: (
      <>
        A REST API that feels native on the JVM — one HTTP call, JSON back, and
        at home in anything from a Spring Boot service to a batch job. Read the{' '}
        <Link href='/docs/guides/pdf'>PDF guide</Link> to go deeper.
      </>
    ),
    items: [
      {
        title: 'No Libraries to Install',
        description:
          'Skip Flying Saucer, openhtmltopdf, and wkhtmltopdf entirely. There is no rendering engine to add to the classpath or keep patched.'
      },
      {
        title: 'JDK HttpClient Is Enough',
        description:
          'java.net.http.HttpClient ships with Java 11 and up. It is a plain HTTP GET, so OkHttp, Apache HttpClient, or Spring RestClient work just as well.'
      },
      {
        title: 'Framework Friendly',
        description:
          'Drop it into Spring Boot, Quarkus, or a Jakarta EE servlet as a controller, resource, or endpoint in a few lines.'
      },
      {
        title: 'Small Container Images',
        description:
          'No Chrome layer and no system fonts to bake in. Your image stays the JRE plus your JAR, which keeps cold starts short on serverless.'
      },
      {
        title: 'Real Browser Rendering',
        description:
          'Pages render in Headless Chrome, so flexbox, grid, web fonts, and JavaScript all survive — the things JVM renderers silently drop.'
      },
      {
        title: 'Heap Stays Yours',
        description:
          'No browser process competing with the JVM for memory. A conversion costs one thread waiting on an outbound request.'
      },
      {
        title: 'Custom Paper & Layout',
        description:
          'Every layout option is a query field: pdf.format, pdf.margin, pdf.landscape, pdf.scale, and pdf.pageRanges.'
      },
      {
        title: 'Screen & Print Media',
        description:
          'PDF rendering defaults to print stylesheets. Add mediaType=screen to the query when you want the on-screen layout instead.'
      },
      {
        title: 'Generous Free Tier',
        description:
          'Start free at 25 requests per day. Production traffic moves to pro.microlink.io with an x-api-key header.'
      }
    ]
  },

  tool: {
    title: (
      <>
        Try it live in the <Accent>playground</Accent>
      </>
    ),
    caption:
      'Paste a URL and see the exact API request before you write a line of Java.',
    cta: {
      label: 'Open the PDF tool',
      href: '/tools/website-to-pdf'
    }
  },

  faq: {
    title: 'Java PDF FAQ',
    caption: (
      <>
        What Java developers ask before integrating. For formats, limits, and
        SLA, see the <Link href='/pdf'>PDF API overview</Link>.
      </>
    ),
    questions: [
      {
        question:
          'Do I need Flying Saucer, openhtmltopdf, or a headless browser?',
        answer: (
          <>
            <div>
              No. It is a plain HTTP request to the Microlink API — there is no
              rendering library on the classpath and no Chromium to download.
              The Headless Chrome fleet runs on Microlink&apos;s side.
            </div>
            <div>
              That also means JavaScript-heavy pages render correctly — unlike
              JVM renderers, which never execute scripts and support only a
              subset of CSS.
            </div>
          </>
        )
      },
      {
        question: 'Which HTTP client should I use?',
        answer: (
          <>
            <div>
              Any of them. <code>java.net.http.HttpClient</code> ships with the
              JDK since Java 11 and needs no dependency; OkHttp, Apache
              HttpClient, and Spring&apos;s <code>RestClient</code> issue the
              same <code>GET</code>.
            </div>
            <div>
              The JDK has no JSON parser, so read <code>data.pdf.url</code> with
              whichever library you already have — Jackson, Gson, or JSON-P.
            </div>
          </>
        )
      },
      {
        question: 'Does it work with Spring Boot, Quarkus, and Jakarta EE?',
        answer: (
          <>
            <div>
              Yes. Because it is just an HTTP call, it drops into a Spring
              controller, a Quarkus resource, or a servlet in a few lines — see
              the tabs above, or the{' '}
              <Link href='/docs/guides/pdf'>PDF guide</Link>.
            </div>
          </>
        )
      },
      {
        question: 'How do I authenticate from Java?',
        answer: (
          <>
            <div>
              Two things change together: send your key as the{' '}
              <code>x-api-key</code> header, and point the request at{' '}
              <code>pro.microlink.io</code> instead of{' '}
              <code>api.microlink.io</code>. Sending the header to the free
              endpoint returns an <code>EPRO</code> error.
            </div>
            <div>
              With the JDK client that is{' '}
              <code>.header(&quot;x-api-key&quot;, key)</code> on the request
              builder. See the{' '}
              <Link href='/docs/api/basics/authentication'>
                authentication docs
              </Link>{' '}
              and <Link href='/pricing'>pricing</Link>.
            </div>
          </>
        )
      },
      {
        question: 'What paper sizes and margins can I set?',
        answer: (
          <>
            <div>
              A0 to A6, Letter, Legal, Ledger, and Tabloid, with margins in px,
              in, cm, or mm. Orientation, scale, and page ranges are query
              fields too.
            </div>
            <div>
              Every option is documented under the{' '}
              <Link href='/docs/api/parameters/pdf'>pdf parameter</Link>.
            </div>
          </>
        )
      },
      {
        question: 'Will a conversion block my request threads?',
        answer: (
          <>
            <div>
              Far less than the alternatives. No browser process starts on your
              host, so a conversion costs one thread waiting on an outbound
              request rather than hundreds of megabytes of heap per document.
            </div>
            <div>
              The request is still synchronous, so for bulk jobs use{' '}
              <code>sendAsync</code>, a virtual thread, or a queue — and cached
              documents come back sub-second on repeat conversions.
            </div>
          </>
        )
      }
    ]
  },

  cta: {
    title: (
      <>
        Start <Accent>converting</Accent> in Java
      </>
    ),
    caption:
      'Get 25 requests/day with zero commitment — no account, no credit card. Drop the snippet into a controller and ship a PDF today.',
    primary: {
      label: 'Read the API docs',
      href: '/docs/api/getting-started/overview'
    },
    secondary: { label: 'See pricing', href: '/pricing' },
    badges: ['No login needed', '25 reqs/day free', 'No credit card']
  }
}

export default java
