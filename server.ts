import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { predictLoanApproval, BENCHMARK_MODELS, FEATURE_IMPORTANCES, DATASET_SUMMARY } from "./src/data/mlEngine";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "healthy",
      timestamp: Date.now(),
      model_loaded: true,
      model_name: "Gradient Boosting Classifier (84.55% Accuracy)"
    });
  });

  app.get("/api/model-info", (_req, res) => {
    res.json({
      best_model_name: "Gradient Boosting",
      best_accuracy: 84.55,
      models: BENCHMARK_MODELS,
      feature_importance: FEATURE_IMPORTANCES,
      dataset_summary: DATASET_SUMMARY
    });
  });

  app.get("/api/analytics", (_req, res) => {
    res.json({
      dataset_summary: DATASET_SUMMARY,
      feature_importance: FEATURE_IMPORTANCES,
      benchmark_models: BENCHMARK_MODELS
    });
  });

  app.post("/api/predict", (req, res) => {
    try {
      const { applicant_name, ...input } = req.body;
      const result = predictLoanApproval(input, applicant_name);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({
        error: "Invalid input parameters",
        details: err?.message || "Check provided numeric and categorical values."
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Loan Approval Predictor server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
